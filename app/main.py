import question
from flask import *
import random
from urllib import parse
import json

app = Flask(__name__)

questionKorean = {
    'goguryeo': '고구려',
    'baekjae': '백제',
    'shilla': '신라',
    'unifiedSilla': '통일 신라',
    'goryeo': '고려',
    'joseon': '조선'
}


questionDict = {
    "goguryeo": question.goguryeo,
    "baekjae": question.baekjae,
    "shilla": question.shilla,
    "unifiedSilla": question.unifiedSilla,
    "goryeo": question.goryeo,
    "joseon": question.joseon
}

questionList = list(questionDict)

@app.route('/')
def index():
    response = make_response(render_template('index.html'))
    response.set_cookie("timesJSON", value=parse.quote(json.dumps(questionKorean)))
    response.delete_cookie("keyword")
    return response

@app.route('/quiz', methods=['GET'])
def quizTimes():
    if request.method == 'GET':
        times = request.args.getlist('times[]')
        if times == []:
            return redirect(url_for('index'))
        quizDict = []
        keywords = []
        for i in times:
            if i not in questionList:
                return redirect(url_for('index'))
            quizDict.append(questionDict[i])
            keywords.append([key for key in list(questionDict[i])])
        timeNum = random.randint(0, len(times)-1)
        keyword = keywords[timeNum][random.randint(0, len(keywords[timeNum])-1)] # 정답
        quizList = quizDict[timeNum][keyword]

        if quizList is list:
            quiz = quizList[random.randint(0, len(quiz)-1)] # 문제
        else:
            quiz = quizList[0] # 문제
        
        keyword = keyword.encode('utf-8')

        response = make_response(render_template('quiz.html', quiz=quiz))
        response.set_cookie('keyword', parse.quote(keyword))

        return response

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000)