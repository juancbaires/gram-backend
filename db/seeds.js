const User = require('../models/User')


User.find({}).remove(() => {
    let juan = User.create({
        username: 'juan',
        password: 'juan',
        memes: ['https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjzztTh17fgAhVMhuAKHR8qBXgQjRx6BAgBEAU&url=https%3A%2F%2Fimgflip.com%2Fmemetemplates&psig=AOvVaw1lesRaxs1XXb5fCz6KCdPj&ust=1550112114826172', 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiqhKHo17fgAhXKnOAKHQ8NCg4QjRx6BAgBEAU&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Fme.me%252Fi%252Fwalking-into-an-empty-gym-like-ama-its-a-beautiful-18396700%26psig%3DAOvVaw1lesRaxs1XXb5fCz6KCdPj%26ust%3D1550112114826172&psig=AOvVaw1lesRaxs1XXb5fCz6KCdPj&ust=1550112114826172']
    }).then(() => {
        user.save(err => {
            console.log(err)
        })
    })
})