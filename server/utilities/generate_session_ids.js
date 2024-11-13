// generate session id strings for user after registration and login

export default function Generate_Session_Id(){
    const tokens = '0123456789?@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
    // generate a string of length 48 
    let token_len = tokens.length;
    let session_id = "";
    for(let i=0;i<48;i++){
        session_id+=tokens[Math.floor(Math.random()*token_len)];
    }
    return session_id;
}