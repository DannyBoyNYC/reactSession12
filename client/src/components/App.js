import React from 'react';
import Recipes from './Recipes';
import RecipeDetails from './RecipeDetails';
import RecipeMaintenance from './RecipeMaintenance';
import EditRecipe from './EditRecipe';

import { Router, Link } from '@reach/router';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      isLoading: false
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    fetch(`http://localhost:5000/api/recipes`)
      .then(response => response.json())
      .then(recipes =>
        this.setState({
          recipes: recipes
        })
      );
  }

  addRecipe = recipe => {
    this.setState({ isLoading: true });
    fetch(`http://localhost:5000/api/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipe)
    })
      .then(response => response.json())
      .then(recipe => console.log(recipe));
    const recipes = [...this.state.recipes];
    recipes.unshift(recipe);
    this.setState({ recipes: recipes, isLoading: false });
  };

  handleDelete(id) {
    fetch(`http://localhost:5000/api/recipes/${id}`, {
      method: 'DELETE'
    });
    const recipes = [...this.state.recipes];
    recipes.splice(id, 1);
    this.setState({ recipes: recipes });
  }

  render() {
    if (this.state.isLoading) {
      return 'Loading...';
    }

    return (
      <div>
        <nav>
          <Link to='/'>Home</Link> <Link to='/maintenance'>Maintenance</Link>
        </nav>
        <Router>
          <Recipes path='/' recipes={this.state.recipes} />
          <RecipeDetails path='/recipe/:recipeId' />
          <RecipeMaintenance
            path='/maintenance'
            addRecipe={this.addRecipe}
            recipes={this.state.recipes}
            handleDelete={this.handleDelete}
          />
          <EditRecipe path='/editrecipe/:recipeId' />
        </Router>
      </div>
    );
  }
}

export default App;
