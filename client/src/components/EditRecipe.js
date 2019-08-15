import React from 'react';

class EditRecipe extends React.Component {
  state = {
    recipe: [],
    title: '',
    isLoading: false
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(`http://localhost:5000/api/recipes/${this.props.recipeId}`)
      .then(response => response.json())
      .then(recipe =>
        this.setState({
          recipe: recipe,
          isLoading: false
        })
      );
  }

  handleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.title);
    const updatedRecipe = {
      title: this.state.title
    };
    const options = {
      method: 'PUT',
      body: JSON.stringify(updatedRecipe),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(
      `http://localhost:5000/api/recipes/${this.props.recipeId}`,
      options
    ).then(response => console.log(response));
  };

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <h3>Edit Recipe</h3>
        <p>Current title: {this.state.recipe.title}</p>
        <input
          type='text'
          placeholder='New Title'
          name='title'
          value={this.state.title}
          onChange={this.handleChange}
        />
        <button type='submit'>Submit</button>
      </form>
    );
  }
}

export default EditRecipe;
