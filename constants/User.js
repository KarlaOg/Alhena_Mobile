import t from "tcomb-form-native";

export let RegisterUser = t.struct({
    email: t.String,
    username: t.String,
    password: t.String,
    terms: t.Boolean
});
/*
let LoginUser = t.struct({
    email: t.String,
    password: t.String,
    terms: t.Boolean
});

export default LoginUser;
*/

