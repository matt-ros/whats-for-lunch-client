import React from 'react';
import ItemsApiService from '../../services/items-api-service';
import PollsApiService from '../../services/polls-api-service';
import PollForm from '../PollForm/PollForm';

class EditPoll extends React.Component {
  state = {
    poll: {},
    items: [],
    error: null,
  }

  async componentDidMount() {
    try {
      const { poll, items } = await PollsApiService.getPoll(this.props.match.params.id);
      this.setState({ poll, items });
    } catch (res) {
      this.setState({ error: res.error });
    }
  }

  handleDeleteExistingItem = async (idx) => {
    const newPollItems = this.state.items.filter((_, index) => index !== idx);
    const itemId = this.state.items[idx].id;
    try {
      await ItemsApiService.deleteItem(itemId);
    } catch (res) {
      this.setState({ error: res.error });
    }
      
    this.setState({ items: newPollItems });

  }

  render() {
    const { error } = this.state;
    
    return (
      <>
        {error && <p className="error">{error}</p>}
        <section>
          <h2>Edit Poll</h2>
        </section>

        <PollForm
          poll={this.state.poll}
          items={this.state.items}
          handleDeleteExistingItem={this.handleDeleteExistingItem}
          history={this.props.history}
        />
      </>
    );
  }
}

export default EditPoll;
