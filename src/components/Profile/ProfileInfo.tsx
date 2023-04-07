import React, { ChangeEvent, Component } from 'react';

type StateType = {
  editStatus: boolean;
  status: null | string;
};

type PropsType = {
  status: string;
  updateStatus: (newStatus: string) => void;
};

class ProfileInfo extends Component<PropsType, StateType> {
  state = {
    editStatus: true,
    status: this.props.status,
  };

  changeStatus = () => {
    this.setState(prevState => {
      return { editStatus: !prevState.editStatus };
    });
    const { updateStatus } = this.props;
    const { status } = this.state;
    updateStatus(status);
  };

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ status: e.currentTarget.value });
  };

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }
  }

  render() {
    const { status } = this.props;
    const { editStatus } = this.state;
    return (
      <div>
        Status:{' '}
        {editStatus ? (
          <span style={{ cursor: 'pointer' }}>
            {status}
            <button onClick={this.changeStatus}>Изменить</button>
          </span>
        ) : (
          <label htmlFor="status">
            <input
              onChange={this.onStatusChange}
              autoFocus={true}
              onBlur={this.changeStatus}
              name="status"
              value={this.state.status}
              type="text"
            />
            <button onClick={this.changeStatus}>Сохранить</button>
          </label>
        )}
      </div>
    );
  }
}
export default ProfileInfo;
