import gravatar from 'gravatar';

export default ({
  me({req}) {
    return Promise.resolve({
      ...req.user,
      avatar200x200: gravatar.url(req.user.email, {s: '200', d: 'retro'})
    });
  }
});
