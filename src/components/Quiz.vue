<template>
  <div class="main-quiz step-2">
    <div class="frame">
      <ProgressBar
        :current="questionStep"
        :total="totalQuestion"
      />
      <QuestionBox
        :question="currentQuestion"
        :profile="profile"
        @optionSelected="setAnsweredOption"
      />
      <a
        href="javascript:void(0)"
        class="btn"
        @click="confirmAnswer"
      >
        {{ $t('quiz.confirmAnswer') }}
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProgressBar from '@/components/ProgressBar'
import QuestionBox from '@/components/QuestionBox'

export default {
  name: 'mainQuiz',
  components: {
    ProgressBar,
    QuestionBox
  },
  props: {
    profile: {
      type: Object,
      default: () => {}
    },
    username: {
      type: String,
      default: ''
    },
    questionStep: {
      type: Number,
      default: 0
    },
    totalQuestion: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      answeredQustion: null
    }
  },
  computed: {
    ...mapGetters({
      quizData: 'quiz/quizData'
    }),
    currentQuestion () {
      return this.quizData.questions.filter((question, index) => (index + 1) === this.questionStep)[0]
    }
  },
  methods: {
    ...mapActions({
      setQuestionStep: 'quiz/setQuestionStep',
      updateCorrectAnswer: 'quiz/updateCorrectAnswer'
    }),
    confirmAnswer () {
      // Check if user select an answer
      if (this.answeredQustion !== null) {
        this.profile.answers.forEach((answer) => {
          // Check and match question id with streamer/youtuber
          if (answer.id === this.currentQuestion.id) {
            // Check if answer is right
            if (this.answeredQustion === answer.correct) {
              this.updateCorrectAnswer()
            }
            this.answeredQustion = null
          }
        })
        // Go Next Question
        this.setQuestionStep()
      }
    },
    setAnsweredOption (index) {
      this.answeredQustion = index
    }
  }
}
</script>
