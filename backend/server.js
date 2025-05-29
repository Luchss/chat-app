import express from "express";
import { matchedData, validationResult, checkSchema } from "express-validator";
import { registerValidationSchema, loginValidationSchema, usernameSchema, emailSchema, passwordSchema } from "./validation/validationSchemas.js";
import cors from "cors";
import bcrypt from "bcrypt";
import { createUser, userLoginCheck, updateUser } from "./users.js";

import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const PORT = 3001;
const saltRounds = 10;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const lastMessages = [];
const MAX_MESSAGES = 50;

wss.on("connection", (ws) => {
    let username = "";
  
    ws.on("message", (message) => {
      console.log("Message:", message.toString());
      const data = JSON.parse(message);
      
      if (data.type === "setUsername") {
        username = data.username;
        console.log(`${username} is now Online!`);
        ws.send(JSON.stringify({
          type: "messageHistory",
          messages: lastMessages
        }));
      };

      if (data.type === "chatMessage") {
        if (username === "") {
          ws.send(JSON.stringify({
              type: "error",
              message: "You must be logged in to send messages."
          }));
          return;
        }
        const newMessage = {
          type: "chatMessage",
          username: username,
          message: data.message,
          timestamp: new Date().toLocaleTimeString("de-DE", { hour12: false })
        };

        lastMessages.push(newMessage);
        if (lastMessages.length > MAX_MESSAGES) {
          lastMessages.shift();
        }

        wss.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
              client.send(JSON.stringify(newMessage));
            }
          }); 
      };
    });

    ws.on("close", () => {
        console.log(`${username} is now Offline!`);
      });
    });

app.post("/register", checkSchema(registerValidationSchema), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const data = matchedData(req); 
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;
    await createUser(data);
    return res.status(201).send("Success!");
})

app.post("/login", checkSchema(loginValidationSchema), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const dbData = await userLoginCheck(req.body.email);
  if (!dbData) {
      res.status(401).json({ success: false, message: "Invalid email or password!" });
  } else {
      bcrypt.compare(req.body.password, dbData[0].password, function(err, result) {
          if (err) {
              res.status(500).send({ err: "Server Error" });
              return;
          } 
            
          if (!result) {
              console.log("Login Failed!", result);
              res.status(401).send("Password does not match!");
              return;
          }

          console.log("Successfully logged in!", result);
          console.log(dbData);
          res.status(200).json({ message: "Successfully logged in!", user: dbData });
      }); 
  }
})

app.put("/profile/update", async (req, res) => {
  const { id, field, value } = req.body;
  let fieldSchema;

  switch (field) {
    case "username":
      fieldSchema = usernameSchema;
      break;
    case "email":
      fieldSchema = emailSchema;
      break;
    case "password":
      fieldSchema = passwordSchema;
      break;
    default:
      return res.status(400).json({ success: false, message: "Error Field does not Exist" });
  }
  await Promise.all(checkSchema(fieldSchema).map((fn) => fn(req, res, () => {})));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  let updatedUser;

  if (field === "password") {
    const hashedPassword = await bcrypt.hash(value, saltRounds);
    updatedUser = await updateUser(id, field, hashedPassword);
  } else {
    updatedUser = await updateUser(id, field, value);
  }

  if (!updatedUser || updatedUser.length === 0) {
    return res.status(404).json({ success: false, message: "User Not Found" });
  }

  res.status(200).json({ success: true, user: updatedUser[0] });
});


server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})