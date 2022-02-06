const { user, message } = require("../../models");
const { Op } = require('sequelize')
const sequelize = require('sequelize')

exports.addMessage = async (req, res) => {
    try {        
        const userId = req.user.id
        const idParam = req.params.id        
        const messageUser = req.body.message

        const newMessage = await message.create({
            message: messageUser,
            sourceIdMessage: userId,            
            targetIdMessage: idParam,            
        });

        let data = await message.findOne({
            where: {
                id: newMessage.id,
            },        
            include:[
                {
                    model: user,
                    as: 'sourceMessage',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password'],
                    },
                },
                {
                    model: user,
                    as: 'targetMessage',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password'],
                    },
                },
            ],        
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'id'],
            },
        });                    

        res.send({
            data
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
        status: 'failed',
        message: 'Server Error',
        });
    }
};

exports.getMessage = async (req, res) => {
    const me = req.user.id;
    const you = req.params.id;
    try {

      let data = await message.findAll({                       
        where: {
            [Op.or]:[
                {
                    [Op.and] : [{targetIdMessage: you}, {sourceIdMessage: me}]
                },
                {
                    [Op.and] : [{targetIdMessage: me}, {sourceIdMessage: you}]
                }
            ]
        },                     
        include: [
            {
                model: user,
                as: 'sourceMessage',              
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password'],
                },                                               
            },                                                         
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'password', 'id'],
        },   
        raw: true
      });         
      
    // data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        sourceIdMessage: item['sourceIdMessage'],
        targetIdMessage: item['targetIdMessage'],
        message: item['message'],
        sourceMessage: {
            id: item['sourceMessage.id'],
            fullName: item['sourceMessage.fullName'],
            email: item['sourceMessage.email'],
            username: item['sourceMessage.username'],
            image: process.env.FILE_PATH + item['sourceMessage.image'],                    
        }
      };
    });
      
    res.send({
        status: "success",
        data
    });
    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Server Error',
      });
    }
}; 

exports.getMessagebyIdUser = async (req, res) => {
    try {             
      let data = await message.findAll({                       
        where: {
            targetIdMessage: req.params.id,            
        },               
        include:[
            {
                model: user,
                as: 'sourceMessage',              
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password'],
                },                                               
            },
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
        },         
        group:['sourceIdMessage'],
        raw: true       
      });         

        data = data.map((item) => {
            return {                
                sourceIdMessage: item['sourceIdMessage'],                
                username: item["sourceMessage.username"],                
                image: process.env.FILE_PATH + item["sourceMessage.image"],
            };
        });
  
      res.send({
          status: "success",
          data
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Server Error',
      });
    }
}; 

exports.getMessagebyIdUserDua = async (req, res) => {
    try {             
      let data = await message.findAll({                       
        where: {
            sourceIdMessage: req.params.id,            
        },               
        include:[
            {
                model: user,
                as: 'sourceMessage',              
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password'],
                },                                               
            },
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
        },         
        group:['targetIdMessage'],
        raw: true       
      });         

        data = data.map((item) => {
            return {                
                sourceIdMessage: item['targetIdMessage'],                
                username: item["sourceMessage.username"],                
                image: process.env.FILE_PATH + item["sourceMessage.image"],
            };
        });
  
      res.send({
          status: "success",
          data
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Server Error',
      });
    }
};