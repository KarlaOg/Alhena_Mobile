import t from "tcomb-form-native";

export let RegisterUser = t.struct({
    'Adresse email': t.String,
    'Prénom': t.String,
    'Nom': t.String,
    'Mot de passe': t.String, 
    'Date de naissance': t.Number, 
    'Accepter les terms': t.Boolean
});

let LoginUser = t.struct({
    'Adresse e-mail': t.String,
    'Mot de passe': t.String,
});

t.form.Form.stylesheet.textbox.normal.borderWidth = 0;
t.form.Form.stylesheet.textbox.error.borderWidth = 0;

t.form.Form.stylesheet.textbox.normal.marginBottom = 0;
t.form.Form.stylesheet.textbox.error.marginBottom = 0;

t.form.Form.stylesheet.textboxView.normal.borderWidth = 0;
t.form.Form.stylesheet.textboxView.error.borderWidth = 0;

t.form.Form.stylesheet.textboxView.normal.borderRadius = 0;
t.form.Form.stylesheet.textboxView.error.borderRadius = 0;

t.form.Form.stylesheet.textboxView.normal.borderBottomWidth = 2;
t.form.Form.stylesheet.textboxView.error.borderBottomWidth = 2;

t.form.Form.stylesheet.textboxView.normal.marginBottom = 5;
t.form.Form.stylesheet.textboxView.error.marginBottom = 5;



t.form.Form.stylesheet.textboxView.normal.borderBottomColor = '#41FFE1';
t.form.Form.stylesheet.textboxView.error.borderBottomColor = '#FF6B6B';

t.form.Form.stylesheet.textbox.normal.color = '#FFFFFF';
t.form.Form.stylesheet.textbox.error.color = '#FFFFFF';

t.form.Form.stylesheet.controlLabel.normal.color = '#FFFFFF';
t.form.Form.stylesheet.controlLabel.error.color = '#FFFFFF';


t.form.Form.stylesheet.controlLabel.normal.fontFamily = 'text-font';
t.form.Form.stylesheet.controlLabel.error.fontFamily = 'text-font';

t.form.Form.stylesheet.controlLabel.normal.fontSize = 18;
t.form.Form.stylesheet.controlLabel.error.fontSize = 18;


t.form.Form.stylesheet.textboxView.normal.fontFamily = 'text-font';
t.form.Form.stylesheet.textboxView.errorfontFamily = 'text-font'; 


t.form.Form.stylesheet.textbox.normal.fontFamily = 'text-font';
t.form.Form.stylesheet.textbox.error.fontFamily = 'text-font';

export default LoginUser;


