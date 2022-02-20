import scala.io.StdIn.readLine

val query: String = "https://www.berlin.de/sen/web/service/maerkte-feste/strassen-volksfeste/brandenburg/index.php/index/all.json?q=";

object HelloWorld {
  def main(args: Array[String]) = {
    println("Hello to block party planner!, What is your name?")
    val name: String = readLine()
    println("I have your name " + name)

    val responseFuture: Future[HttpResponse] = Http().singleRequest(HttpRequest(uri = query))

    println(responseFuture)
  }
}
