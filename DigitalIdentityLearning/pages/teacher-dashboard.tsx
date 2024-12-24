import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function TeacherDashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [students, setStudents] = useState([]);
  const [videos, setVideos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch tasks, students, and videos from the API
    // This is a placeholder and should be replaced with actual API calls
    setTasks([{ id: 1, title: 'Sample Task', completed: false }]);
    setStudents([{ id: 1, name: 'John Doe' }]);
    setVideos([{ id: 1, title: 'Introduction to React', url: 'https://youtube.com/watch?v=123' }]);
  }, []);

  const addTask = async () => {
    // Add task to the API
    // This is a placeholder and should be replaced with an actual API call
    setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }]);
    setNewTask('');
  };

  const addStudent = () => {
    // Navigate to add student page
    router.push('/add-student');
  };

  const addVideo = () => {
    // Navigate to add video page
    router.push('/add-video');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">To-Do List</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
        <div className="mt-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="border rounded px-2 py-1 mr-2"
          />
          <button onClick={addTask} className="bg-blue-500 text-white px-4 py-1 rounded">
            Add Task
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Students</h2>
        <ul>
          {students.map((student) => (
            <li key={student.id}>{student.name}</li>
          ))}
        </ul>
        <button onClick={addStudent} className="bg-green-500 text-white px-4 py-1 rounded mt-2">
          Add Student
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Video Content</h2>
        <ul>
          {videos.map((video) => (
            <li key={video.id}>{video.title}</li>
          ))}
        </ul>
        <button onClick={addVideo} className="bg-purple-500 text-white px-4 py-1 rounded mt-2">
          Add Video
        </button>
      </div>
    </div>
  );
}

