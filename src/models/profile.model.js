'use strict'


const profiles =(sequelize,DataTypes)=> sequelize.define('profiles',{

fullName :{
type:DataTypes.STRING,
allowNull:false 

},
numberOfPost :{
type:DataTypes.STRING,
},


theAge:{
type:DataTypes.STRING,
    }
})


module.exports=profiles;