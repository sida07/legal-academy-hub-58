
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Timer, Book, Award, CheckCircle2, XCircle, StopCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    text: "ما هو المبدأ الأساسي في القانون المدني؟",
    options: [
      "حسن النية في التعاقد",
      "المسؤولية التقصيرية",
      "حرية التعاقد"
    ],
    correctAnswer: 2
  },
  // Add more sample questions here
];

const MCQTest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds

  const handleEndTest = () => {
    toast({
      title: "تم إنهاء الاختبار",
      description: "سيتم توجيهك إلى صفحة الاختبارات",
    });
    navigate('/qcm');
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === sampleQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;
  const subjectName = location.state?.subjectName || "الاختبار";

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Book className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">{subjectName}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Timer className="w-5 h-5 text-primary" />
              <span className="font-medium">
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
              </span>
            </div>
            <Button
              variant="destructive"
              onClick={handleEndTest}
              className="gap-2"
            >
              <StopCircle className="w-5 h-5" />
              إنهاء الاختبار
            </Button>
          </div>
        </div>

        {!showResults ? (
          <>
            <Card className="mb-6 animate-slide-up">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>السؤال {currentQuestion + 1} من {sampleQuestions.length}</span>
                  <Progress value={progress} className="w-32" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-6">{sampleQuestions[currentQuestion].text}</p>
                <div className="space-y-4">
                  {sampleQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-right p-4 rounded-lg border-2 transition-all ${
                        selectedAnswer === index
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="gap-2"
              >
                {currentQuestion === sampleQuestions.length - 1 ? 'إنهاء الاختبار' : 'السؤال التالي'}
              </Button>
            </div>
          </>
        ) : (
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6 text-primary" />
                النتيجة النهائية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-6">
                <div className="text-4xl font-bold text-primary">
                  {Math.round((score / sampleQuestions.length) * 100)}%
                </div>
                <div className="flex justify-center gap-8">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>الإجابات الصحيحة: {score}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    <span>الإجابات الخاطئة: {sampleQuestions.length - score}</span>
                  </div>
                </div>
                <div className="flex justify-center gap-4 pt-6">
                  <Button onClick={() => navigate('/qcm')}>
                    العودة للرئيسية
                  </Button>
                  <Button variant="outline" onClick={() => window.location.reload()}>
                    إعادة الاختبار
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MCQTest;
