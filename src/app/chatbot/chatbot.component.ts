import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatbotService } from '../chatbot.service';

interface Message {
  text: string;
  isUser: boolean;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  @ViewChild('chatHistory') private chatHistory?: ElementRef;

  userInput: string = '';
  messages: Message[] = [];

  constructor(private chatbotService: ChatbotService) { }

  sendMessage(): void {
    if (!this.userInput.trim()) {
      return;
    }

    const userMessage: Message = { text: this.userInput, isUser: true };
    this.messages.push(userMessage);
    this.userInput = '';

    const greetings = ['hi', 'hello'];
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    // Check if user input is a greeting and determine time of day
    if (greetings.includes(userMessage.text.toLowerCase())) {
      let botResponse: string;

      if (currentHour >= 5 && currentHour < 12) {
        botResponse = 'Good morning, how can i assist you?';
      } else if (currentHour >= 12 && currentHour < 18) {
        botResponse = 'Good afternoon, how can i assist you?';
      } else {
        botResponse = 'Good evening, how can i assist you?';
      }

      const botMessage: Message = { text: botResponse, isUser: false };
      this.messages.push(botMessage);
      this.scrollToBottom();
    } else {
      // Default response using ChatbotService for other user inputs
      this.chatbotService.getResponseByQuestion(userMessage.text)
        .subscribe(
          (response: string) => {
            const botMessage: Message = { text: response, isUser: false };
            this.messages.push(botMessage);
            this.scrollToBottom();
          },
          (error) => {
            console.error('Error fetching chatbot response:', error);
            const errorMessage: Message = { text: 'An error occurred while fetching the response.', isUser: false };
            this.messages.push(errorMessage);
            this.scrollToBottom();
          }
        );
    }
  }

  scrollToBottom(): void {
    setTimeout(() => {
      if (this.chatHistory) {
        this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
      }
    });
  }
}
