import User from '../models/User';

class UserController {
  async store(req, res) {
    if (req.body.email === 'edsaraujoc@gmail.com') {
      return res.status(400).json({ error: 'Not found!!! ' });
    }
    const user = await User.create(req.body);

    return res.json(user);
  }
}

export default new UserController();