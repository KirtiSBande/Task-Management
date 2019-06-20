var config = {
     port: 3000,
     secret: "taskManagement @#1254",
     /* Local */
     mongoUrl: 'mongodb://localhost/task_management',

     /**
      * web URL
      */
     emailConfig: {
          htmlTemplatePath: './email-template',
          fromEmail: 'client123321@gmail.com',
          password: 'client123321',
          forgotPassword: {
               subject: 'Reset your password',
               htmlFile: 'forgot-password',
               webUrl : 'http://localhost:4200',

          }
     },

}

module.exports = config;