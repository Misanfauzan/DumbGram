const { user, feed, follow, like, comment, message } = require("../../models");
const sequelize = require('sequelize')

exports.addFeed = async (req, res) => {
  const userId= req.user.id
  try {
    const datas = req.body;

    const newFeed = await feed.create({
      ...datas,
      userIdFeed: userId,
      image: req.file.filename,
      caption: req.body.caption,
    });
      

    let data = await feed.findOne({
      where: {
        id: newFeed.id,
      },
      include: [
        {
          model: user,
          as: 'feedId',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },          
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userIdFeed'],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    // code here
    data = {
      ...data,
      image: process.env.FILE_PATH + data.image,
    };

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

exports.getFeed = async (req, res) => {
  try {
    let data = await feed.findAll({
      include: [
        {
          model: like,
          as: 'likeFeed',              
          attributes: {
            include: [
              [sequelize.fn('COUNT', sequelize.col('feedIdLike')), 'Like']
            ],
            exclude: ['createdAt', 'updatedAt', 'userIdFeed', 'id'],
          },  
        }, 
        {
          model: user,
          as: 'feedId',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },                                              
        },                 
      ],      
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser'],
      },
      group: ['feed.id'],
      raw: true,
      order: [
        sequelize.fn( 'RAND' ),
      ]
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        id: item['id'],
        fileName: process.env.FILE_PATH + item['image'],
        like: item['likeFeed.Like'],
        caption: item['caption'],
        username: item['feedId.username'],
        image: process.env.FILE_PATH + item['feedId.image'],
        user: {
          id: item['feedId.id'],
          fullName: item['feedId.fullName'],
          username: item['feedId.username'],
          Image: process.env.FILE_PATH + item['feedId.image'],
        }        
      };
    });

    res.send({
      status: 'success...',
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

exports.getFeedByFollow = async (req, res) => {
  // const id = req.user.id;        
  try {
    const { id } = req.params;        
    let data = await follow.findAll({                       
      where: {
        fromFollow: id,
      },                                       
        include: [
            {
              model: user,
              as: 'fromFollower',              
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'password', "email", "bio"],
              },
              include: [
                {
                  model: feed,
                  as: 'feedId',                   
                  attributes: {
                    exclude: ['createdAt', 'updatedAt', 'userIdFeed', 'id'],
                  },  
                  include:[
                    {
                      model: like,
                      as: 'likeFeed',              
                      attributes: {                        
                        include: [
                          [sequelize.fn('COUNT', sequelize.col('feedIdLike')), 'Like']
                        ],
                        exclude: ['createdAt', 'updatedAt', 'userIdLike', 'id', 'feedIdLike'] 
                      },                        
                    },                                        
                  ]                  
                },                                                      
              ],  
            },                       
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'id', 'fromFollow', 'toFollow'],
        },  
        group: ['fromFollower.feedId.id'],
        raw: true
    });   

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        id: item["fromFollower.feedId.id"],
        fileName: process.env.FILE_PATH + item["fromFollower.feedId.image"],
        like: item['fromFollower.feedId.likeFeed.Like'],
        caption: item["fromFollower.feedId.caption"],
        username: item["fromFollower.username"],
        Image: process.env.FILE_PATH + item["fromFollower.image"],
        user: {
          id: item["fromFollower.id"],
          fullName: item["fromFollower.fullName"],
          username: item["fromFollower.username"],
          Image: process.env.FILE_PATH + item["fromFollower.image"],
        },                             
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

exports.addLike = async (req, res) => {
  const userId = req.user.id
  const { id } = req.params;        

  try {
    const newLike = await like.create({
        feedIdLike: id,
        userIdLike: userId,        
    });
    
    let data = await like.findOne({
        where: {
          id: newLike.id,
        },        
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
    });

    data = {             
      feedIdLike: newLike.feedIdLike, 
      userIdLike: newLike.userIdLike, 
    };

    // generate token
    
    res.status(200).send({
      status: "success...",
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

exports.addComment = async (req, res) => {
  const userId= req.user.id
  try {
    const newComment = await comment.create({
      feedIdComment: req.body.feedIdComment,
      userIdComment: userId,        
      comment: req.body.comment,        
    });
    
    let commentData = await comment.findOne({
        where: {
          id: newComment.id,
        },        
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
    });

    commentData = {             
      feedIdComment: newComment.feedIdComment, 
      userIdComment: newComment.userIdComment, 
      comment: newComment.comment, 
    };

    // generate token
    
    res.status(200).send({
      status: "success...",
      data: {        
        comment: commentData
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.getComment = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await comment.findAll({
      where: {
        feedIdComment: id,
      },
      include: {
        model: user,
        as: "userComment",
        attributes: {
          exclude: ["createdAt", "updatedAt", 'password'],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userIdComment"],
      },
    });

    res.send({
      status: "success",
      data
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getCommentByUserFeed = async (req, res) => {
  try {
    const { id } = req.params;

    let data = await user.findAll({
      where: {
        id: id,
      },
      include: [
        {
          model: feed,
          as: 'feedId',              
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],            
          },
          include: [
            {
              model: comment,
              as: 'feedComment',                   
              attributes: {
                exclude: ['createdAt', 'updatedAt'],                
              },                    
              include:[
                {
                  model: user,
                  as: 'userComment',              
                  attributes: {                                            
                    exclude: ['createdAt', 'updatedAt', 'password', 'id'] 
                  },                
                },                                        
              ],                             
            },                                                      
          ],  
        },                       
      ],      
      attributes: {
        exclude: ["createdAt", "updatedAt", "feedIdComment", "userIdComment"],
      },      
      group: ['feedId.feedComment.id'],
      raw: true
    });

    data = data.map((item) => {
      return {
        comment: item["feedId.feedComment.comment"],                                     
        username: item["feedId.feedComment.userComment.username"],                                     
        image: process.env.FILE_PATH + item["feedId.feedComment.userComment.image"],                                     
      };
    });

    res.send({
      status: "success",
      data
    });

  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getFeedCommentbyId = async (req, res) => {
  try {
    const { id } = req.params;        
    let data = await feed.findAll({
      where: {
        id: id,              
      },
      include: [        
        {
          model: comment,
          as: 'feedComment',
          attributes: {            
            exclude: ['createdAt', 'updatedAt', 'password'],
          },                       
          include: [        
            {
              model: user,
              as: 'userComment',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'password'],
              },                                              
            },                 
          ],                                              
        },                 
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser'],
      },
      raw: true
    });    

    data = data.map((item) => {
      return {
        comment: item['feedComment.comment'],
        userComment: item['feedComment.userComment.username'],
        image: process.env.FILE_PATH + item['feedComment.userComment.image']
      };
    });    

    res.send({
      status: 'success...',
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

exports.getFeedbyId = async (req, res) => {
  try {
    const { id } = req.params;        
    let data = await feed.findAll({
      where: {
        id: id,
      },
      include: [
        {
          model: like,
          as: 'likeFeed',              
          attributes: {
            include: [
              [sequelize.fn('COUNT', sequelize.col('feedIdLike')), 'Like']
            ],
            exclude: ['createdAt', 'updatedAt', 'userIdFeed', 'id'],
          },  
        }, 
        {
          model: user,
          as: 'feedId',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },                                              
        },                 
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser'],
      },
      group: ['feed.id'],
      raw: true
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        id: item['id'],
        fileName: process.env.FILE_PATH + item['image'],
        like: item['likeFeed.Like'],
        caption: item['caption'],
        user: {
          id: item['feedId.id'],
          fullName: item['feedId.fullName'],
          username: item['feedId.username'],
          Image: process.env.FILE_PATH + item['feedId.image']
        }        
      };
    });

    res.send({
      status: 'success...',
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

exports.getCommentFeed = async (req, res) => {
  try {
    // const { id } = req.params;

    let data = await comment.findAll({          
      include: [
        {
          model: feed,
          as: 'feedComment',              
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],            
          },    
          include: [
            {
              model: user,
              as: 'feedId',              
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'password'],            
              },            
            },
          ]        
        }, 
        {
          model: user,
          as: 'userComment',              
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],            
          },            
        },                      
      ],      
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },      
      raw: true
    });    

    data = data.map((item) => {
      return {
        comment: item["comment"],  
        idUser: item['feedComment.userIdFeed'],
        username: item["userComment.username"],                                     
        image: process.env.FILE_PATH + item["userComment.image"],                                     
        feedId: item["feedIdComment"],                                     
      };
    });

    res.send({
      status: "success",
      data
    });

  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getLikeFeedId = async (req, res) => {
  try {
    const { id } = req.params;        
    let data = await like.findAll({
      where: {
        feedIdLike: id,
      },
      include: [
        {
          model: feed,
          as: 'likeFeed',              
          attributes: {            
            exclude: ['createdAt', 'updatedAt', 'userIdFeed', 'id'],
          },  
        },                         
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser'],
      },      
      // group: []
      raw: true
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        id: item['id'],
        feedIdLike: item['feedIdLike'],
        userIdLike: item['userIdLike'],
        image: process.env.FILE_PATH + item['likeFeed.image'],
        caption: item['likeFeed.caption'] 
      };
    });

    res.send({
      status: 'success...',
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

exports.getCommentId = async (req, res) => {
  try {
    const { id } = req.params;

    let data = await comment.findAll({
      where:{
        feedIdComment: id
      },          
      include: [
        {
          model: feed,
          as: 'feedComment',              
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],            
          },    
          include: [
            {
              model: user,
              as: 'feedId',              
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'password'],            
              },            
            },
          ]        
        }, 
        {
          model: user,
          as: 'userComment',              
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],            
          },            
        },                      
      ],      
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },      
      raw: true
    });    

    data = JSON.parse(JSON.stringify(data));
    
    data = data.map((item) => {
      return {
        comment: item["comment"],  
        idUser: item['feedComment.userIdFeed'],
        username: item["userComment.username"],                                     
        image: process.env.FILE_PATH + item["userComment.image"],                                     
        feedId: item["feedIdComment"],                                     
      };
    });

    res.send({
      status: "success",
      data
    });

  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getLikeAll = async (req, res) => {
  try {
    let data = await like.findAll({      
      include: [
        {
          model: feed,
          as: 'likeFeed',              
          attributes: {            
            exclude: ['createdAt', 'updatedAt', 'userIdFeed', 'id'],
          },  
        },                         
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser'],
      },      
      // group: []
      raw: true
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        id: item['id'],
        feedIdLike: item['feedIdLike'],
        userIdLike: item['userIdLike'],
        image: process.env.FILE_PATH + item['likeFeed.image'],
        caption: item['likeFeed.caption'] 
      };
    });

    res.send({
      status: 'success...',
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