/** @format */

import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import tr from '@iamtraction/google-translate';
// Load environment variables
dotenv.config();

const bot = new Telegraf('7521303706:AAHsZNsbuCcu6NhMbVJK8mNwWckEirmkexs');


bot.on('channel_post', async (ctx) => {
    const post = ctx.channelPost;
    const chatId = post.chat.id;
    const messageId = post.message_id;

    let text = post.text;


    try {
      const rus = await  tr(post.text, { from: 'uz', to: 'ru' })

      text+= `    

<b>🇷🇺${rus.text}</b>`
      
    } catch (error) {
      console.log(error);
      console.log("when to ru");
    }
    try {
      const eng = await  tr(post.text, { from: 'uz', to: 'en' })

      text+= `

<b>🇬🇧${eng.text}</b>`
      
    } catch (error) {
      console.log("when to en");
    }
       

    // Update the post text
    try {
        await bot.telegram.editMessageText(
            chatId,
            messageId,
            undefined,
            `${text}

@withsamijonov` , {parse_mode :'HTML'}
        );
        console.log('Post updated successfully');
    } catch (error) {
        console.error('Failed to update post:', error);
    }
});


//     console.log('hudhd89');
//     const chatId = ctx.chat.id;

//     try {
//         await ctx.telegram.sendPoll(chatId, 'What is your favorite programming language?', [
//             'JavaScript',
//             'TypeScript',
//             'Python',
//             'Java',
//         ]);
//     } catch (error) {
//         console.error('Failed to send poll:', error);
//     }
// });
// bot.on('edited_channel_post', (ctx) => {
//     console.log(ctx);
//     const editedPost = ctx.editedChannelPost;
//     console.log(editedPost);
//     console.log(`Post edited in channel: ${editedPost.text || editedPost.caption}`);
// });

// Start the bot
bot.launch().then(() => {
    console.log('Bot started!');
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
