import { useSelector } from "react-redux";
import { useMemo } from "react";
export const useFilteredTodos = (descriptionFilter = "", isDoneFilter) => {
  const todos = useSelector((state) => state.todoRdc.todos);

  return useMemo(() => {
    // Si aucun filtre, retourner la liste complète
    if (!descriptionFilter && typeof isDoneFilter !== "boolean") {
      return todos;
    }

    return todos.filter((task) => {
      const matchesDescription = task.description
        .toLowerCase()
        .includes(descriptionFilter.toLowerCase().trim());

      const matchesStatus =
        typeof isDoneFilter === "boolean" ? task.isdone === isDoneFilter : true;

      return matchesDescription && matchesStatus;
    });
  }, [todos, descriptionFilter, isDoneFilter]);
};
