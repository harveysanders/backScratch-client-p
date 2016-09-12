import _ from 'underscore';

const Helpers = {
  shortenString: (string, letterCount) => {
    if (string.length > letterCount) {
      var cutString = string.substring(0, letterCount);
      return cutString + '...';
    }
    else {
      return string;
    }
  },
  formatTasksforList(tasks, dispatch) {
    return tasks.map((item) => _.extend(
      item.task.properties,
      {
        taskId: item.task._id, // taskId isn't included in properties
        dispatch
      }
    ));
  }
};

export default Helpers;
