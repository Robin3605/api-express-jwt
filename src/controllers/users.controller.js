
export const createUsers = async (req, res) => {

    const { userName, email, password, roles } = req.body;
    const newUser = new user({
        userName,
        email,
        password: await user.encryptPassword(password),
        roles
    });

    const userSaved = await newUser.save();
    res.status(201).json(userSaved);
}