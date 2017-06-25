import React, { Component } from 'react';
import homeStore from '../stores/homeStore';

const homeStoreWithSubscription = (WrappedComponent) => {
  class withSubscription extends Component {
    constructor (props) {
      super(props);
      this.state = {
        homeStoreState: homeStore.getState()
      };
      this.onChangeHomeStore = this.onChangeHomeStore.bind(this);
    }

    componentDidMount () {
      homeStore.addChangeListener(this.onChangeHomeStore);
    }

    componentWillMount () {
      homeStore.removeChangeListener(this.onChangeHomeStore);
    }

    onChangeHomeStore () {
      const homeStoreState = homeStore.getState();
      this.setState({ homeStoreState });
    }

    render () {
      return (
				<WrappedComponent
					{...this.props}
					homeStoreState={this.state.homeStoreState}
				/>
      );
    }
	}
  return withSubscription;
};

export default homeStoreWithSubscription;
