const User = require('../models/User')

const UserAddress = require('../models/User_Address')


const getUserbyId = async (req, res) => {
    try {
        // Get the authenticated user's ID from Auth0
        const auth0UserId = req.oidc.user.sub; // "sub" is the unique identifier for the user in Auth0

        // Find the user in your database using the Auth0 user ID, including addresses
        const user = await User.findOne({
            where: { auth0_id: auth0UserId },
            include: [
                {
                    model: UserAddress,
                    as: 'addresses' // This matches the alias in your associations
                }
            ]
        });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Return the user's data with addresses
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while retrieving the user." });
    }
};


//update a user info 




//delete user info 




module.exports = { getUserbyId };