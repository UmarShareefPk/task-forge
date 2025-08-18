export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'new' | 'in-progress' | 'late' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  dueDate: Date;
  createdBy: string;
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
}
