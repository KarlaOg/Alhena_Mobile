export const options = {
    fields: {
        email: {
            label: 'Adresse Email',
            error: 'Without an email address how are you going to reset your password when you forget it?'
        },
        firstname: {
            label: 'Prénom',
        },
        lastname: {
            label: 'Nom',
        },
        birthdate: {
            label: 'Date de naissance',
        },
        password: {
            password: true,
            secureTextEntry: true,
            label: 'Mot de passe',
            error: 'Choose something you use on a dozen other sites or something you won\'t remember'
        },
    },
};

