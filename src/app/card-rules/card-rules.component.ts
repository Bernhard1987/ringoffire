import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-card-rules',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './card-rules.component.html',
  styleUrl: './card-rules.component.scss'
})
export class CardRulesComponent {
  cardAction = [
    { "title": "Waterfall", "description": "Everyone starts drinking, and no one can stop until the person to their right stops." },
    { "title": "You", "description": "The person who drew the card chooses someone to take a drink." },
    { "title": "Me", "description": "The person who drew the card takes a drink." },
    { "title": "Floor", "description": "Everyone must touch the floor, and the last person to do so takes a drink." },
    { "title": "Guys", "description": "All guys take a drink." },
    { "title": "Chicks", "description": "All girls take a drink." },
    { "title": "Heaven", "description": "Everyone reaches for the sky, and the last person to do so takes a drink." },
    { "title": "Mate", "description": "The person who drew the card chooses a drinking buddy. Whenever they drink, the buddy must drink as well." },
    { "title": "Rhyme", "description": "The person who drew the card says a word, and everyone else must say a word that rhymes with it. The first person who can't think of a rhyme or repeats a word takes a drink." },
    { "title": "Categories", "description": "The person who drew the card chooses a category (e.g., types of fruit, colors), and everyone must say something from that category. The first person who can't think of something or repeats an item takes a drink." },
    { "title": "Rule", "description": "The person who drew the card makes a rule that everyone must follow until the next Jack is drawn. For example, \"No pointing\" or \"No using first names.\" Anyone caught breaking the rule takes a drink." },
    { "title": "Questions", "description": "The person who drew the card starts by asking someone a question. That person must then ask someone else a question, and so on. The first person to fail to ask a question takes a drink." },
    { "title": "King's Cup", "description": "The person who draws the fourth King pours a portion of their drink into a central cup in the middle of the circle. The person who draws the final King must drink the entire contents of the King's Cup." }
  ];

  title: string = '';
  description: string = '';

  @Input() card: string = '';
  @Input() players: string[] = [];
  @Input() cardstack: string[] = [];

  ngOnChanges() {
    if (this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }

  }
}
