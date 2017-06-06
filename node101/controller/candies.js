module.exports = (app) => {

  let candies = [
    {id: 1, name: "Chewing Gum" , color: "Red" },
    {id: 2, name: "Pez" , color: "Green" },
    {id: 3, name: "Marshmellow" , color: "Pink" },
    {id: 4, name: "Candy Stick" , color: "Blue" },
  ];

  app.get('/candies', (req,res) => {
  res.json(candies);
})

  app.get('/candies/:id', (req,res) => {
  const id = req.params.id;
  let candy = candies.filter((candy) => {
    return candy.id == id;
  })
  res.json(candy);
})

  app.post('/candies', (req,res) => {
    res.json({
      body: req.body
    })
    candies.push(req.body);
    res.json(candies);
  })

  app.put('/candies/:id', (req,res) => {

    const id= req.params.id;
    candies[id-1] = req.body;
    res.json(candies);
  })

  app.delete('/candies/:id', (req, res) => {

  const id = req.params.id;

  delete candies[id-1];
  res.json('ok');
})

}
