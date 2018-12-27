module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        patient_id: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        reason_for_visit: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        
        employee: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        }


    });

    Post.associate = function (models) {
        models.Post.belongsTo(models.Patient, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }

        })
    };


    return Post;
};