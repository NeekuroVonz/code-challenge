import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";

interface Resource {
	id: number;
	name: string;
	description: string;
}

interface FormData {
	name: string;
	description: string;
}

const App: React.FC = () => {
	const { control, handleSubmit, reset } = useForm<FormData>();
	const [resources, setResources] = useState<Resource[]>([]);
	const [editing, setEditing] = useState<Resource | null>(null);
	const API_URL = "http://localhost:3000/resources";

	// Fetch resources
	const fetchResources = async () => {
		try {
			const response = await axios.get<Resource[]>(API_URL);
			setResources(response.data);
		} catch (error) {
			console.error("Error fetching resources:", error);
		}
	};

	useEffect(() => {
		fetchResources();
	}, []);

	// Create or Update resource
	const saveResource = async (data: { name: string; description: string }) => {
		try {
			if (editing) {
				await axios.put(`${API_URL}/${editing.id}`, data);
			} else {
				await axios.post(API_URL, data);
			}
			reset();
			setEditing(null);
			fetchResources();
		} catch (error) {
			console.error("Error saving resource:", error);
		}
	};

	// Delete resource
	const deleteResource = async (id: number) => {
		try {
			await axios.delete(`${API_URL}/${id}`);
			fetchResources();
		} catch (error) {
			console.error("Error deleting resource:", error);
		}
	};

	// Set resource for editing
	const editResource = (resource: Resource) => {
		reset({ name: resource.name, description: resource.description });
		setEditing(resource);
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
			<div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
				<h1 className="text-2xl font-semibold text-center mb-4">Resource Manager</h1>
				<form onSubmit={handleSubmit(saveResource)} className="space-y-4">
					<div>
						<label className="block text-gray-700">Name</label>
						<Controller name="name" control={control} render={({ field }) => <input {...field} type="text" placeholder="Resource Name" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />} />
					</div>
					<div>
						<label className="block text-gray-700">Description</label>
						<Controller name="description" control={control} render={({ field }) => <textarea {...field} placeholder="Resource Description" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />} />
					</div>
					<div className="text-center">
						<button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
							{editing ? "Update" : "Create"}
						</button>
					</div>
					<div className="text-center">
						<button
							type="button"
							onClick={() => {
								reset();
								setEditing(null);
							}}
							className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
							Clear
						</button>
					</div>
				</form>
			</div>
			<div className="mt-8 w-full max-w-lg">
				<ul className="space-y-4">
					{resources.map((resource) => (
						<li key={resource.id} className="flex items-center justify-between p-4 bg-white shadow rounded-lg">
							<div>
								<strong>{resource.name}</strong>: {resource.description}
							</div>
							<div className="flex space-x-2">
								<button onClick={() => editResource(resource)} className="text-blue-500 hover:text-blue-600">
									Edit
								</button>
								<button onClick={() => deleteResource(resource.id)} className="text-red-500 hover:text-red-600">
									Delete
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default App;
