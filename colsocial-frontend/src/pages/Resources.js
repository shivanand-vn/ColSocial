import React from "react";
import useResources from "../hooks/useResources";
import ResourceForm from "../components/ResourceForm";
import ResourceList from "../components/ResourceList";

function ResourcesPage() {
  const { resources, addResource, deleteResource } = useResources();

  return (
    <div>
      <h2>Resources</h2>
      <ResourceForm onAdd={addResource} />
      <ResourceList resources={resources} onDelete={deleteResource} />
    </div>
  );
}

export default ResourcesPage;
