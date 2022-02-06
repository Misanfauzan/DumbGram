const { user, follow, feed, like } = require("../../models");
const sequelize = require('sequelize')

exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll({      
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },     
    });   

    res.send({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    let { id } = req.params;
    let data = await user.findOne({   
      where: {
        id: id,
      },                 
      attributes: {              
        exclude: ["password", "createdAt", "updatedAt"],
      },    
      raw: true    
  });             

  data = {    
    id: data.id,
    fullName: data.fullName,
    username: data.username,
    bio: data.bio,
    image: process.env.FILE_PATH + data.image,
  };

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

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;        

    // await user.update(req.body, {
    //   where: {
    //     id,
    //   },
    // });

    const datas = {
      fullName: req?.body?.fullName,
      bio: req?.body.bio,
      username: req?.body?.username,
      image: req?.file?.filename,      
    };   

    await user.update(datas, {
      where: {
        id,
      },
    });


    let data = await user.findOne({
        where: {
          id,
        },        
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
    });

    data = JSON.parse(JSON.stringify(data));
    data = {
      ...data,
      image: process.env.FILE_PATH + data.image,
    };

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

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await user.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      data:{
        id
      } 
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.follower = async (req, res) => {
    try {
        const { id } = req.params;        
        const data = await follow.findAll({              
            where: {
                toFollow: id,
            },  
            include: [
                {
                  model: user,
                  as: 'ToFollowing',
                  attributes: {                    
                    exclude: ['createdAt', 'updatedAt', 'password'],
                  },                  
                },        
            ],
            attributes: {              
              exclude: ['createdAt', 'updatedAt', 'fromFollow', 'toFollow'],
            },   
        });   
    
        res.send({
            status: "success",
            data:{
              followers: data
            }
        });
    } catch (error) {
    console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
    }
};

exports.following = async (req, res) => {
    try {
        const { id } = req.params;        
        const data = await follow.findAll({              
            where: {
                fromFollow: id,
            },  
            include: [
                {
                  model: user,
                  as: 'fromFollower',
                  attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password'],
                  },                  
                },        
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'fromFollow', 'toFollow'],
            },   
        });   
    
        res.send({
            status: "success",
            data:{
              following: data
            }
        });
    } catch (error) {
    console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
    }
};

exports.getUsersbyId = async (req, res) => {
  try {
    let { id } = req.params;
    let data = await user.findAll({   
      where: {
        id: id,
      }, 
      include:[        
        {
          model: feed,
          as: 'feedId',              
          attributes: {                        
            include: [
              [sequelize.fn('COUNT', sequelize.col('userIdFeed')), 'post']
            ],
            exclude: ['createdAt', 'updatedAt', 'userIdLike', 'id', 'image', 'caption', 'userIdFeed'] 
          },                                
        },                
      ],            
      attributes: {              
        exclude: ["password", "createdAt", "updatedAt"],
      },    
      raw: true    
  });   
    
  data = JSON.parse(JSON.stringify(data));
  data = data.map((item) => {
    return {
      id: item['id'],
      fullName: item['fullName'],
      email: item['email'],
      username: item['username'],
      image: process.env.FILE_PATH + item['image'],
      bio: item['bio'],
      post: item['feedId.post']
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

exports.getFollowingCount = async (req, res) => {
  try {
    let { id } = req.params;
    let data = await follow.findAll({   
      where: {
        fromFollow: id,
      },             
      attributes: {  
        include: [
          [sequelize.fn('COUNT', sequelize.col('fromFollow')), 'Following']
        ],            
        exclude: ["password", "createdAt", "updatedAt", "fromFollow", "toFollow", "id"],
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

exports.getFollowerCount = async (req, res) => {
  try {
    let { id } = req.params;
    let data = await follow.findAll({   
      where: {
        toFollow: id,
      },             
      attributes: {  
        include: [
          [sequelize.fn('COUNT', sequelize.col('toFollow')), 'Follower']
        ],            
        exclude: ["password", "createdAt", "updatedAt", "fromFollow", "toFollow", "id"],
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

exports.getUserFeedbyId = async (req, res) => {
  try {
    let { id } = req.params;
    let data = await user.findAll({   
      where: {
        id: id,
      }, 
      include:[        
        {
          model: feed,
          as: 'feedId',              
          attributes: {                                    
            exclude: ['createdAt', 'updatedAt'] 
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
      attributes: {              
        exclude: ["password", "createdAt", "updatedAt"],
      },       
      group: ['feedId.id'],
      raw: true        
  });   

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
    return {
        id: item['id'],
        feedId: item['feedId.id'],
        fullName: item['fullName'],
        email: item['email'],
        username: item['username'],
        image: process.env.FILE_PATH + item['image'],
        bio: item['bio'],
        imagePost: process.env.FILE_PATH + item['feedId.image'],
        like: item['feedId.likeFeed.Like']
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

exports.addFollow = async (req, res) => {
  const userId = req.user.id
  const idParam = req.params.id
  try {

    const newFollow = await follow.create({
      fromFollow: userId,      
      toFollow: idParam,      
    });
      

    let data = await follow.findOne({
      where: {
        id: newFollow.id,
      },      
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    // code here
    data = {
      ...data,
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