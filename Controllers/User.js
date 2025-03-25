const User = require('../models/User');
const UserAddress = require('../models/User_Address');
const auth0 = require('../Util/auth0');
const createAuth0Client = require('../Util/auth0Token');

const getUserbyId = async (req, res) => {
    try {
        const auth0UserId = req.oidc.user.sub;
        const user = await User.findOne({
            where: { auth0_id: auth0UserId },
            include: [
                {
                    model: UserAddress,
                    as: 'addresses'
                }
            ]
        });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while retrieving the user." });
    }
};
const updateProfile = async (req, res) => {
    try {
        const auth0 = await createAuth0Client();
        const auth0UserId = req.oidc.user?.sub;
        if (!auth0UserId) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        const { name, email } = req.body;
        const user = await User.findOne({ where: { auth0_id: auth0UserId } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if NO changes were made
        if (email === user.email && name === user.name) {
            return res.status(400).json({
                error: 'No changes detected',
                currentData: { name: user.name, email: user.email }
            });
        }

        // Check for duplicate email (only if email is being changed)
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ error: 'Email already in use by another user' });
            }
        }

        // Prepare updates
        const updates = {};
        if (name && name !== user.name) updates.name = name;
        if (email && email !== user.email) updates.email = email;

        // If no valid updates exist after checks
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: 'No valid changes provided' });
        }

        // Update database
        await user.update(updates);

        // Update Auth0
        const auth0UserID = auth0UserId.startsWith('auth0|')
            ? auth0UserId
            : `auth0|${auth0UserId}`;

        await auth0.users.update({ id: auth0UserID }, updates);

        return res.status(200).json({
            message: 'Profile updated successfully',
            updatedFields: updates // Only shows changed fields
        });

    } catch (err) {
        console.error('Update error:', err);
        return res.status(500).json({ error: 'Update failed', details: err.message });
    }
};
const createAddress = async (req, res) => {
    try {
        const auth0UserId = req.oidc.user.sub;
        const user = await User.findOne({ where: { auth0_id: auth0UserId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const { governorate, district, street, building, postal_code, country, phone_number } = req.body;
        const address = await UserAddress.create({
            user_id: user.id,
            governorate,
            district,
            street,
            building,
            postal_code,
            country,
            phone_number,
        });
        return res.status(201).json({ message: 'Address created successfully', address });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while creating the address.' });
    }
};

module.exports = {
    getUserbyId,
    createAddress,
    updateProfile
};
