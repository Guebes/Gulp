// Definindo a constante com a função da importação do pacote do gulp 
const constReq_gulp = require('gulp')

// O pacote "gulp-sass" é reponsável por integrar o sass com o gulp. Pacote "sass" é responsável por compilar todo o conteudo 
const Reqsass = require('gulp-sass')(require('sass'))

// Constante que irá receber a importação (require) do pacote "source-maps" 
const sourceMaps = require('gulp-sourcemaps')

// Constante que irá receber a importação (require) do pacote "uglify", que é responsável pela minificação do JS dentro do GULP 
const ConstUglify = require('gulp-uglify')

// Constante que irá receber a importação (require) do pacote "obfuscate" 
const Const_Obfuscate = require('gulp-obfuscate')

// Constante que irá receber a importação (require) do pacote "image min" 
const Const_ReqMinImg = require('gulp-imagemin')


function MinImage(){

    return constReq_gulp.src('./source/imagens/*').pipe(Const_ReqMinImg()).pipe(constReq_gulp.dest('./build/imagens'))
}


function MinificarJS(){

    return constReq_gulp.src('./source/scripts/*.js')
    .pipe(ConstUglify())
    .pipe(Const_Obfuscate())
    .pipe(constReq_gulp.dest('./build/scripts'))
}

function compilarSass(){
    
    return constReq_gulp.src('./source/estilos/*.scss') 
        .pipe(sourceMaps.init())
        .pipe(Reqsass({

            outputStyle: 'compressed'
        }))
        .pipe(sourceMaps.write('./maps')) // "write()" cria o arquivo de mapeamento de cada linha SCSS e considera o diretorio onde estão os arquivos CSS
        .pipe(constReq_gulp.dest('./build/estilos'))
}


function FuncaoTeste_gulp(callback){

    console.log("Teste de execução de uma função com o gulp")
    callback();
}

// 1 - Por que a função 'callback' é importante aqui?

// R: O gulp precisa saber quando uma tarefa termina para poder passar para a próxima ou encerrar um processo.
//   Se eu chamar o 'callback()' o gulp vai entender que o processo ainda não acabou e vai ficar "travado" 


// 2 - Como eu exporto essa função??

exports.default = FuncaoTeste_gulp // Dessa maneira eu consigo exportar uma função de um arquivo .gulp
// [exports] [nome da tarefa] = nome da função


function Pergunta(){ // tarefa privada

    console.log("Como está?")
}

function Cumprimento(callback){ // tarefa publica

    console.log("Olá!")
    Pergunta();
    callback();
}

exports.Cumprimento = Cumprimento

// As tarefas publicas são exportadas.
// As tarefas privadas não são exportadas, mas podemos usar elas dentro de outras tarefas(funções).


// [exports.default = constReq_gulp.series(FuncaoTeste_gulp, Cumprimento)]

// Vai estar exportando a função-padrão e a constante "gulp", que recebeu como valor o requerimento do pacote gulp, vai estar chamando
//  a função de uma lista de funções a serem executadas


// Para executarmos uma tarefa em paralelo, utilizamos a função "parallel()"
exports.default = constReq_gulp.parallel(FuncaoTeste_gulp, Cumprimento)

exports.Reqsass = compilarSass

exports.minificarJS = MinificarJS

exports.minImage = MinImage