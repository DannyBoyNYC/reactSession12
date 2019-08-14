import React, { Component, createRef } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
// import { styled } from 'styled-components';

class ListRecipes extends Component {
  render() {
    // const myButton = styled.button`
    //   background-color: transparent;
    // `;
    return (
      <ul>
        {this.props.recipes.map(recipe => (
          <li key={recipe._id}>
            {recipe.title}{' '}
            <button
              style={{ backgroundColor: 'transparent', border: 'none' }}
              onClick={() => this.props.handleDelete(recipe._id)}
            >
              <FaTimesCircle color="rgb(194, 57, 42)" size={20} />
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

class RecipeMaintenance extends Component {
  titleRef = createRef();
  imageRef = createRef();
  descriptionRef = createRef();

  createRecipe(e) {
    e.preventDefault();
    const recipe = {
      title: this.titleRef.current.value,
      image: this.imageRef.current.value,
      description: this.descriptionRef.current.value,
    };
    this.props.addRecipe(recipe);
  }

  render() {
    return (
      <div>
        <h3>Add Recipe Form</h3>
        <form onSubmit={e => this.createRecipe(e)}>
          <input
            type="text"
            placeholder="Recipe Title"
            name="title"
            ref={this.titleRef}
          />
          <input
            type="text"
            placeholder="Image"
            name="image"
            ref={this.imageRef}
          />
          <textarea
            type="text"
            placeholder="Description"
            name="description"
            ref={this.descriptionRef}
          />
          <button type="submit">Submit</button>
        </form>
        <ListRecipes
          recipes={this.props.recipes}
          handleDelete={this.props.handleDelete}
        />
      </div>
    );
  }
}

export default RecipeMaintenance;
