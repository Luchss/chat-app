import connection from "./db.js";

async function createUser({ username, email, password}) {
    try {
        const [checkIfEmailExists] = await connection.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        console.log(checkIfEmailExists.length);
        if (checkIfEmailExists.length > 0) {
            console.log("Email already Exists!");
            return;
        }
        const [results] = await connection.query(
            "INSERT INTO users (username, email, password, profile_img) VALUES (?, ?, ?, ?)",
            [username, email, password, "users_images/default.png"]
        );
        console.log(`Success New User Registered!`);
    } catch (err) {
        console.log(err);
    }
}

async function userLoginCheck(email) {
    try {
        const [loginData] = await connection.query(
            "SELECT id, username, email, password, profile_img FROM users WHERE email = ?",
            [email]
        );
        if (loginData.length === 0) {
            console.log("User Not Found!");
            return false;
        }
        if (loginData.length > 0) {
            console.log("User Found!");
            return loginData;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function updateUser(id, field, value) {
    try {
        const allowedFields = ['username', 'email', 'password'];
        if (!allowedFields.includes(field)) {
            throw new Error(`Cannot Change ${field}!`);
        }

        const sql = `UPDATE users SET ${field} = ? WHERE id = ?`;
        const [updateResult] = await connection.query(sql, [value, id]);

        if (updateResult.affectedRows === 0) {
            return { success: false, message: "No User Updated!" };
        }

        const [user] = await connection.query(
            'SELECT id, username, email, password, profile_img FROM users WHERE id = ?',
            [id]
        );
        return user;
    } catch (err) {
        console.error(err);
        return;
    }
}

export {createUser, userLoginCheck, updateUser};