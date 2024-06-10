import User from '../models/user.model.js'
import Task from '../models/task.model.js'

export const getTasks = async (req,res)=>{

    const tasks= await Task.find({user:req.user.id}).populate('user');
    res.json(tasks)



}

export const createTask = async (req,res)=>{

    const {title,description,date}=req.body
 console.log(req.user)
   const newTask= new Task({
        title,
        description,
        date,
        user:req.user.id
    })
    const saveTask= await newTask.save()

    res.json(saveTask)

}

export const deleteTask = async (req,res)=>{
    try {
        const taskDelete = await Task.findByIdAndDelete(req.params.id);

        if (!taskDelete) {
            return res.status(404).json({ message: "No tienes tareasssss" });
        }

        // Envía solo la información necesaria en la respuesta
        return res.status(204).json({ message: "Tarea eliminada exitosamente", task: taskDelete });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar la tarea", error: error.message });
    }


}

export const getTask = async (req,res)=>{

    const taskId= Task.findById(req.params.id)

    if(!taskId) res.status(404).json({message:"no tienes tareasssss"})

    return res.json(taskId)



}
export const updateTask = async (req,res)=>{

    const TaskUpdate= Task.findByIdAndUpdate(req.params.id,req.body,{new:true})

    if(!TaskUpdate) res.status(404).json({message:"no tienes tareasssss"})

    return res.json(TaskUpdate)

}