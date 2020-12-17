exports.up = async function(knex) {
    await knex.schema.createTable("users", users=>{
        users
            .increments("id");
        users
            .string("name", 64)
            .notNullable()
        users
            .string("username",255)
            .notNullable()
            .unique()
        users
            .string("password",255)
    })

    await knex.schema.createTable("roles", roles=>{
        roles
            .integer("user_id")
            .notNullable()
            .references("users_id")
            // .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        roles
            .enu("role",["User","Instructor"])
            .notNullable();
        roles
            .primary(["user_id","role"])
    })

    await knex.schema.createTable("classes", classes=>{
       classes
            .increments()
        classes
            .string("name",255)
            .string("type",255)
            .string("startTime",255)
            .string("duration",255)
            .string("intensityLevel",255)
            .string("location",255)
            .integer("RegisteredAttendees",)
            .integer("classSize")

    })

    
   
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("classes")
        .dropTableIfExists("roles")
        .dropTableIfExists("users");
};
