
/*  <tr>
        <td>${index+1}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${categories.find(category=>category.id==product.categoryId).name}</td>
        <td class="${
            conditions.find(condition=>condition.id==product.conditionId).name=="Excelente"
            ?"text-white bg-success"
            :conditions.find(condition=>condition.id==product.conditionId).name=="Bueno"
            ?"text-white bg-warning"
            :"text-white bg-danger"
            }">${conditions.find(condition=>condition-id==product.conditionId).name}</td>
        <td>
            <i title "Actualizar" class="fa-solid me-2 text-warning fa-pen"></i>
            <i title "Eliminar" class="fa-solid text-danger fa-trash"></i>
        </td>
    </tr> */

