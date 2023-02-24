



export function TableHead() {
    return (
        <thead className="block md:table-header-group">
            <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                <th className="bg-purple-400 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Nome</th>
                <th className="bg-purple-400 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Sobrenome</th>
                <th className="bg-purple-400 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Email</th>
                <th className="bg-purple-400 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">CPF</th>
                <th className="bg-purple-400 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Telefone</th>
                <th className="bg-purple-400 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Actions</th>
            </tr>
        </thead>
    )
}