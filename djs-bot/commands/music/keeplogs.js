const colors = require("colors");
const { EmbedBuilder } = require("discord.js");
const SlashCommand = require("../../lib/SlashCommand");
const { keepLogsEmbed } = require("../../util/embeds");

const command = new SlashCommand()
	.setName("keeplogs")
	.setDescription("Remove song history (toggle)")
	.setRun(async (client, interaction) => {
		let channel = await client.getChannel(client, interaction);
		if (!channel) {
			return;
		}
		
		let player;
		if (client.manager.Engine) {
			player = client.manager.Engine.players.get(interaction.guild.id);
		} else {
			return interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setColor("Red")
						.setDescription("Lavalink node is not connected"),
				],
			});
		}
		
		if (!player) {
			return interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setColor("Red")
						.setDescription("There's nothing playing in the queue"),
				],
				ephemeral: true,
			});
		}
		
		const keepLogs = player.get("keepLogs");
		player.set("requester", interaction.guild.members.me);
		
		if (!keepLogs) {
			player.set("keepLogs", true);
		} else {
			player.set("keepLogs", false);
		}

		client.warn(
			`Player: ${ player.options.guild } | [${ colors.blue(
				"KEEPLOGS",
			) }] has been [${ colors.blue(!keepLogs? "ENABLED" : "DISABLED") }] in ${
				client.guilds.cache.get(player.options.guild)
					? client.guilds.cache.get(player.options.guild).name
					: "a guild"
			}`,
		);

		const ret = await interaction.reply({ embeds: [keepLogsEmbed({keepLogs})], fetchReply: true });
		if (ret) setTimeout(() => ret.delete().catch(client.warn), 20000);
		return ret;
	});

module.exports = command;
