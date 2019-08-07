const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        //console.log(req.params.devId);
        //console.log(req.headers.user);

        // apenas o id os usuários
        const { user } = req.headers;
        const { devId } = req.params;
        
        // Objeto do banco dos usuários
        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev) {
            return res.status(400).json({ error: 'Dev not exists' });
        }

        if(targetDev.likes.includes(loggedDev._id)) {
            console.log('Deu Match');
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();
        
        return res.json(loggedDev);
    }
}
// Index , => Lista de index dos recurso
// Show, => Recupera apenas 1 registro
// Store, => Inserir registro
// update, => Atualizar registro
// delete  => Apagar registro