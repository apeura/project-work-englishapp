/* // Get all data
export const getAll = async () => {
  try {
    const response = await fetch("../db.json");
    const tasksData = await response.json();
    return tasksData;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// Add a new Tag to Task
export const addNewTagToTask = async (taskId, newTag) => {
  // Get current Task Tags and add new Tag to array
  try {
    const currentTaskResponse = await fetch(
      `http://localhost:3010/tasks/${taskId}`
    );
    const currentTask = await currentTaskResponse.json();
    const updatedTags = [...currentTask.tags, ...newTag.tags];
    const updatedTask = {
      ...currentTask,
      tags: updatedTags,
    };

    // Save the updated version
    const response = await fetch(`http://localhost:3010/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    if (!response.ok) {
      throw new Error(`Failed to add new tag to task ${taskId}`);
    }
  } catch (error) {
    console.error("Error adding new tag to task:", error);
    throw error;
  }
};

// Update Task name
export const updateTaskTitle = async (taskId, newTitle) => {
  try {
    const response = await fetch(`http://localhost:3010/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    });
    if (!response.ok) {
      throw new Error(`Failed to update task title for id ${taskId}`);
    }
  } catch (error) {
    console.error("Error updating task title:", error);
    throw error;
  }
};

// Delete a task
export async function deleteTask(taskId) {
  const response = await fetch(`http://localhost:3010/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  console.log(`Task deleted! ID: ${taskId}`);
  return response.json();
}

// Save Tasks and Tags manually
export const manualSave = async (tasks, tags) => {
  try {
    await fetch("http://localhost:3010/tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tasks),
    });
    console.log("Tasks saved manually!");
  } catch (error) {
    console.error("Save error tasks:", error);
  }
  try {
    await fetch("http://localhost:3010/tags", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tags),
    });
    console.log("Tags saved manually!");
  } catch (error) {
    console.error("save error tags:", error);
  }
};

// Filter tasks via tags
export const filterTasksByTags = (tasks, selectedTags) => {
  return tasks.filter((task) => {
    // If no tags selected do nothing
    if (selectedTags.length === 0) {
      return true;
    }
    return selectedTags.every((tag) => task.tags.includes(tag));
  });
};

// create Task
export const createTask = async (newTask) => {
  const response = await fetch("http://localhost:3010/tasks/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newTask.title,
      tags: newTask.tags,
      active: false,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  console.log(`New task created!`);
  const createdTask = await response.json();
  return createdTask;
};

// Add tag to system
export const addTag = async (newTag) => {
  try {
    const response = await fetch("http://localhost:3010/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: newTag.value,
      }),
    });
    const createdTag = await response.json();
    return createdTag;
  } catch (error) {
    console.error("Error adding tag:", error);
    throw error;
  }
};

// Update after deleting a Tag
export const deletedTagUpdate = async (taskId, updatedTags) => {
  try {
    const response = await fetch(`http://localhost:3010/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tags: updatedTags,
      }),
    });
    return response.data;
  } catch (error) {
    console.error("Error updating tags:", error);
    throw error;
  }
};

// Changing color scheme to alternate
export const toggleColorMode = (colorScheme) => {
  document.body.classList.toggle("alternate-mode", colorScheme === "alternate");
  document
    .querySelector(".header")
    .classList.toggle("alternate-mode", colorScheme === "alternate");
};

// Color mode fetch & PATCH
export const updateColorMode = (newColorScheme) => {
  fetch("http://localhost:3010/colorState/1", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mode: newColorScheme }),
  })
    .then((response) => response.json())
    .catch((error) => console.error("Error saving color state:", error));
  toggleColorMode(newColorScheme);
};

// Update task mode (default/alternate)
export const updateTaskMode = async (newMode) => {
  fetch("http://localhost:3010/taskMode/1", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mode: newMode }),
  })
    .then((response) => response.json())
    .then((data) => console.log("Task state saved:", data))
    .catch((error) => console.error("Error saving task state:", error));
};

// Update task's active status (true/false)
export const updateActivityStatus = async (taskId, updatedTask) => {
  const response = await fetch(`http://localhost:3010/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTask),
  });

  if (!response.ok) {
    throw new Error(`Failed to update task status.`);
  }
};
 */