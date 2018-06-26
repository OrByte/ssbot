/* Wroted by https://vk.com/rayvy */ /* if u read this, you are PIDOR */
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 }

var bot = new Discord.Client(); /* variable */
var cfg = require('./cfg.json'); /*activate cfg.json*/
console.log("Пачик готов к битве!");
/*there is not so hard commands*/
var commands = {
    "хелп": {
        process: function (msg, suffix) {
            msg.author.send([
                ":page_facing_up:  |  **Доступные команды:**",
				"```perl",
                "!хелп #Показывает доступные команды",
                "!войти #Заходит на доступный голосовой канал",
				"!стоп #Выходить из голосового канала/вырубает шансон (и не только)",
				"!радио <имя_станции> #Включает радио",
				"!список #Показывает список доступных радиостанции",
				"~~~Также забавные фукнции...~~~",
				"!ривер | ",
				"```",
				"",
				"Привет, я Пачик) Я готов к вашим услугам. Но если вы обидете меня, я вас нахуй убью :3"
            ]);
            msg.channel.send(":mailbox_with_mail:  |  **Проверьте личное сообщение!!**");
        }
    },
    "войти": {
        process: function (msg, suffix) {
			const channel = msg.member.voiceChannel;
			if (!channel) return msg.channel.send(':warning:  |  **Вы не находитесь в голосовом канале, зачем врать? :C**');
			if(!msg.member.voiceChannel.joinable) {
				msg.channel.send(":warning:  |  **ыыыы.**");
				return;
			}
			msg.member.voiceChannel.join();
			msg.channel.send(":loudspeaker:  |  **Привет всем мазафакерам!)**");
        }
    },
    "радио": {
        process: function (msg, suffix) {
			const channel = msg.member.voiceChannel;
			if (!channel) return msg.channel.send(':warning:  |  **Зайдите сперва в голосовой канал!.**');
			if (suffix) {
				if (suffix === "р_трап" || suffix === "Radio Record Trap") {
					msg.channel.send(":musical_note:  |  **Playing:** `Radio Record | Trap`");
					var radio = "http://air.radiorecord.ru:8102/trap_320";
				} else if (suffix === "рекорд" || suffix === "Record") {
					msg.channel.send(":musical_note:  |  **Playing:** `РАДИО РЕКОРД`");
					var radio = "http://air.radiorecord.ru:8101/rr_320";
				}
				msg.member.voiceChannel.join().then(connection => {
					require('http').get(radio, (res) => {
						connection.playStream(res);
					})
				})
				.catch(console.error);
			} else {
				msg.channel.send(":warning:  |  **Введите корректно комманду, для открытия списка станции напишите ** `!список`");
			}
        }
    },
	"стоп": {
		process: function (msg, suffix) {
            const voiceChannel = msg.member.voiceChannel;
            if (voiceChannel) {
                if (msg.member.hasPermission("MANAGE_GUILD") == false) {
					msg.channel.send(":warning:  |  **мм.**");
                    return
                }
				msg.channel.send(":loudspeaker:  |  **Съеобываю атсудава**");
                msg.member.voiceChannel.leave();
            } else {
                msg.channel.send(":warning:  |  **мммм**");
            }
		}
	},
	"инвайт": {
		process: function (msg, suffix) {
			msg.channel.send(":tickets:  |  **Я буду только тут!");
		}
	},
	"ривер": {
        process: function (msg) {
			const channel = msg.member.voiceChannel;
				msg.member.voiceChannel.join().then(connection => {
					msg.channel.send(":musical_note:АЙВБИНАЛАЙАРБИНАЗИФ БИАЛОВЕРБИНАЧИТ ОЙМАСИНСНИДХОЛИВОТЕР БИНАВОШИНГОВЕРМИ:musical_note:")
					const dispatcher = connection.playFile('C:/bot/pkg/river.mp3');
				})
        }
    },
	"список": {
        process: function (msg, suffix) {
            msg.channel.send("```р_трап // рекорд```");
        }
    }
};

bot.on("ready", function () {
	console.log("Logged in " + bot.guilds.array().length + " servers");
	bot.user.setGame(cfg.prefix + "хелп | Привет я Пачик) "); /* help */
});

bot.on('message', function (msg) {
    if(msg.content.indexOf(cfg.prefix) === 0) {
		var cmdTxt = msg.content.split(" ")[0].substring(cfg.prefix.length);
		var cmd = commands[cmdTxt];
        var suffix = msg.content.substring(cmdTxt.length + cfg.prefix.length+1);
        if(cmd !== undefined) {
            cmd.process(msg, suffix);
        } else {
			cmdTxt = cmdTxt.replace('`', '');
			if (cmdTxt === ''){
				var cmdTxt = "none";
			}
            msg.channel.send(":warning:  |  **Неизвестная команда!** `" + cmdTxt + "` **Вы можете использовать** `" + cfg.prefix + "хелп" + "` **для просмотра всех функции ПАЧИМАРИКА!!!** `");
        }
    }
});

bot.login(cfg.token);
