// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
//process.env.SENDGRID_API_KEY

module.exports = {
    //Email de confirmação de Email
    confirmarEmail: () => {
        return{
            to: '190200026@estudantes.ips.pt',
            from: 'ipsvoluntariado@gmail.com',
            subject: 'Confirmar Email',
            template_id: 'd-22ac10364c4148f5a5b9507fcc402d62'
        };
    },
    //Email de recuperação de Password
    recuperarPassword: () => {
        return{
            to: '190200026@estudantes.ips.pt',
            from: 'ipsvoluntariado@gmail.com',
            subject: 'Recuperar Password',
            template_id: 'd-0935ddb2419643f2a9e879f3a9d4bfe0'
        };
    },
    //Email de novo Projeto criado
    criarProjeto: () => {
        return{
            to: '190200026@estudantes.ips.pt',
            from: 'ipsvoluntariado@gmail.com',
            subject: 'Projecto Criado',
            template_id: 'd-c5dbf138617b49faad5754d80d15d66a'
        };
    },
    //Email de edição de Projeto
    editarProjeto: () => {
        return{
            to: '190200026@estudantes.ips.pt',
            from: 'ipsvoluntariado@gmail.com',
            subject: 'Projecto Editado',
            template_id: 'd-d3e1d886df2d478b858eb49380783421'
        };
    },
    //Email de remoção de Projeto
    removerProjeto: () => {
        return{
            to: '190200026@estudantes.ips.pt',
            from: 'ipsvoluntariado@gmail.com',
            subject: 'Projecto Removido',
            template_id: 'd-8a0cae9185a8468ca4b069d462b35967'
        };
    },
    //Email de Projeto sem vagas
    projetoSemVagas: () => {
        return{
            to: '190200026@estudantes.ips.pt',
            from: 'ipsvoluntariado@gmail.com',
            subject: 'Sem Vagas',
            template_id: 'd-aaf2a5c12faa45198c64f4b25701ec88'
        };
    }
}