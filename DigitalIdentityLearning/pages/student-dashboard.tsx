import { useState, useEffect } from 'react';

export default function StudentDashboard() {
  const [tasks, setTasks] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch tasks and videos from the API
    // This is a placeholder and should be replaced with actual API calls
    setTasks([{ id: 1, title: 'Complete assignment', completed: false }]);
    setVideos([{ id: 1, title: 'Introduction to React', url: 'https://youtube.com/watch?v=123', watched: false }]);
  }, []);

  const toggleTaskCompletion = (taskId) => {
    // Update task completion status in the API
    // This is a placeholder and should be replaced with an actual API call
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const markVideoAsWatched = (videoId) => {
    // Update video watched status in the API
    // This is a placeholder and should be replaced with an actual API call
    setVideos(videos.map(video => 
      video.id === videoId ? { ...video, watched: true } : video
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">To-Do List</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                className="mr-2"
              />
              <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Video Content</h2>
        <ul>
          {videos.map((video) => (
            <li key={video.id} className="mb-2">
              <span className={video.watched ? 'text-green-500' : ''}>{video.title}</span>
              {!video.watched && (
                <button
                  onClick={() => markVideoAsWatched(video.id)}
                  className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
                >
                  Mark as Watched
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

