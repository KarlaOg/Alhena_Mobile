import t from "tcomb-form-native";

export default t.struct({
    email: t.String,
    username: t.String,
    password: t.String,
    terms: t.Boolean
});
