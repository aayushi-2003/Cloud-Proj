/**
* Copyright 2019 IBM
*
*   Licensed under the Apache License, Version 2.0 (the "License");
*   you may not use this file except in compliance with the License.
*   You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
*   Unless required by applicable law or agreed to in writing, software
*   distributed under the License is distributed on an "AS IS" BASIS,
*   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*   See the License for the specific language governing permissions and
*   limitations under the License.
**/

var express = require('express');
const connectDB = require('./config/database')
require('dotenv').config();
const authRouter=require('./routers/authenticator')
const courseRouter=require('./routers/course')

const PORT=process.env.PORT || 80;

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
connectDB();

app.use('/auth',authRouter)
app.use('/',courseRouter)

app.listen(PORT,()=>{
  console.log(`The server is listening on PORT ${PORT}`)
});
