
function buscarCEP() {
    const input = document.getElementById('cep-input')
    let cep = input.value.trim().replace(/\D/g, '')
    
    const resultDiv = document.getElementById('cep-result')
    
    if (cep.length !== 8) {
        resultDiv.innerHTML = `<div class="bg-red-900/30 border border-red-400 text-red-200 p-6 rounded-2xl">⚠️ O CEP precisa ter 8 números</div>`
        return
    }

    resultDiv.innerHTML = `<p class="text-gray-400">🔄 Carregando endereço...</p>`

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                resultDiv.innerHTML = `<div class="bg-red-900/30 border border-red-400 text-red-200 p-6 rounded-2xl">❌ CEP não encontrado</div>`
                return
            }
            resultDiv.innerHTML = `
                <div class="bg-gray-800 rounded-3xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6 card">
                    <div><p class="text-xs uppercase text-gray-400">Logradouro</p><p class="text-2xl">${data.logradouro || 'Sem rua'}</p></div>
                    <div><p class="text-xs uppercase text-gray-400">Bairro</p><p class="text-2xl">${data.bairro || 'Sem bairro'}</p></div>
                    <div><p class="text-xs uppercase text-gray-400">Cidade</p><p class="text-2xl">${data.localidade}</p></div>
                    <div><p class="text-xs uppercase text-gray-400">Estado</p><p class="text-2xl">${data.uf}</p></div>
                </div>`
        })
        .catch(() => resultDiv.innerHTML = `<div class="bg-red-900/30 border border-red-400 text-red-200 p-6 rounded-2xl">❌ Erro na internet</div>`)
}


function carregarPokemon() {
    const resultDiv = document.getElementById('pokemon-result')
    const id = Math.floor(Math.random() * 151) + 1
    
    resultDiv.innerHTML = `<div class="flex items-center justify-center h-64"><p class="text-2xl animate-pulse">🔄 Buscando Pokémon #${id}...</p></div>`

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(pokemon => {
            const tipos = pokemon.types.map(t => 
                `<span class="inline-block px-4 py-1 text-xs font-bold rounded-2xl mr-2 capitalize bg-gray-600">${t.type.name}</span>`
            ).join('')

            resultDiv.innerHTML = `
                <div class="flex flex-col md:flex-row items-center gap-10 bg-gray-800 rounded-3xl p-8 card">
                    <div class="w-52 h-52 flex-shrink-0 bg-white/10 rounded-3xl flex items-center justify-center">
                        <img src="${pokemon.sprites.front_default}" class="w-40">
                    </div>
                    <div class="flex-1">
                        <h3 class="text-5xl font-bold capitalize">${pokemon.name}</h3>
                        <div class="mt-4">${tipos}</div>
                        <div class="grid grid-cols-2 gap-8 mt-8 text-sm">
                            <div><p class="text-gray-400">Altura</p><p class="text-3xl">${pokemon.height / 10} m</p></div>
                            <div><p class="text-gray-400">Peso</p><p class="text-3xl">${pokemon.weight / 10} kg</p></div>
                        </div>
                    </div>
                </div>`
        })
        .catch(() => resultDiv.innerHTML = `<p class="text-red-400">❌ Erro ao carregar Pokémon</p>`)
}


function carregarUsuario() {
    const resultDiv = document.getElementById('user-result')
    
    resultDiv.innerHTML = `<div class="flex items-center justify-center h-64"><p class="text-2xl animate-pulse">🔄 Gerando pessoa...</p></div>`

    fetch('https://randomuser.me/api/?nat=BR')
        .then(response => response.json())
        .then(data => {
            const user = data.results[0]
            resultDiv.innerHTML = `
                <div class="flex flex-col md:flex-row gap-8 bg-gray-800 rounded-3xl p-8 card">
                    <img src="${user.picture.large}" class="w-48 h-48 rounded-3xl border-4 border-purple-500">
                    <div class="flex-1">
                        <h3 class="text-4xl font-semibold">${user.name.first} ${user.name.last}</h3>
                        <p class="text-purple-400">${user.email}</p>
                        <div class="mt-6 grid grid-cols-3 gap-6">
                            <div><p class="text-xs text-gray-400">IDADE</p><p class="text-3xl">${user.dob.age} anos</p></div>
                            <div><p class="text-xs text-gray-400">CIDADE</p><p class="text-3xl">${user.location.city}</p></div>
                            <div><p class="text-xs text-gray-400">PAÍS</p><p class="text-3xl">${user.location.country}</p></div>
                        </div>
                    </div>
                </div>`
        })
        .catch(() => resultDiv.innerHTML = `<p class="text-red-400">❌ Erro ao carregar usuário</p>`)
}

// Mensagem inicial
window.onload = function() {
    document.getElementById('cep-result').innerHTML = `<div class="bg-blue-900/20 border border-blue-400/30 rounded-3xl p-8 text-center"><p class="text-blue-300">Digite um CEP e clique em Buscar</p></div>`
    document.getElementById('pokemon-result').innerHTML = `<div class="bg-yellow-900/20 border border-yellow-400/30 rounded-3xl p-8 text-center"><p class="text-yellow-300">Clique no botão para ver um Pokémon</p></div>`
    document.getElementById('user-result').innerHTML = `<div class="bg-purple-900/20 border border-purple-400/30 rounded-3xl p-8 text-center"><p class="text-purple-300">Clique no botão para gerar uma pessoa</p></div>`
}
