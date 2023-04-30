import question
from flask import *
import random

app = Flask(__name__)

questionDict = {
    "goguryeo":question.goguryeo,
    "baekjae":question.baekjae,
    "shilla":question.shilla,
    "unifiedSilla":question.unifiedSilla,
    "goryeo":question.goryeo,
    "joseon":question.joseon
}

questionList = list(questionDict)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/quiz')
def quiz():
    return render_template('selectquiz.html')

@app.route('/quiz/<string:times>', methods=['GET', 'POST'])
def quizTimes(times):
    if times not in questionList:
        return redirect(url_for('quiz'))
    
    if request.method =='GET':
        quizDict = questionDict[times]
        keywords = list(quizDict)
        keyword = keywords[random.randint(0, len(keywords)-1)] # 정답
        quizList = quizDict[keyword]

        if quizList is list:
            quiz = quizList[random.randint(0, len(quiz)-1)] # 문제
        else:
            quiz = quizList[0] # 문제

        resp = make_response(render_template('quiz.html', quiz=quiz))
        resp.set_cookie('keyword', str(keyword))
        resp.set_cookie('times', times)

        return resp
    
    elif request.method == 'POST':
        keyword = request.cookies.get('keyword')
        answer = request.form['answer']

        if keyword == answer:
            return render_template('resp.html', result="정답입니다!", url=f"./{times}")
        return render_template('resp.html', result=f"오답입니다. \n정답은 {keyword}입니다.", url=f"./{times}")

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000)